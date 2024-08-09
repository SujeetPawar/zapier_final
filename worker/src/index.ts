require("dotenv").config()

import { JsonObject } from '@prisma/client/runtime/library';
import { PrismaClient } from "@prisma/client";
import { Kafka } from "kafkajs";
import { parse } from './parse';
import { sendEmail } from './email';

const prismaClient = new PrismaClient();
const TOPIC_NAME = "zap-events";

const kafka = new Kafka({
  clientId: "outbox-processor",
  brokers: ["localhost:9092"],
});

async function main() {
  const consumer = kafka.consumer({ groupId: "main-worker" });
  const data = await consumer.connect();
  const producer = kafka.producer();
  await producer.connect();

  console.log(data);

  await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true });

  await consumer.run({
    autoCommit: false,
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value?.toString(),
      });
      if(!message.value?.toString()) return 

        const parsedvalue = JSON.parse(message.value?.toString())
        const zapRunId = parsedvalue.zapRunId;
        const stage = parsedvalue.stage;

        const zapRunDetails = await prismaClient.zapRun.findFirst({
          where:{
            id:zapRunId
          }, 
          include:{
            zap:{
              include:{
                actions:{
                  include:{
                    type: true
                  }
                }
              }
            }, 

          }
        })

        const currentAction = zapRunDetails?.zap.actions.find(x =>x.sortingOrder === stage)

        if(!currentAction){
          console.log("Current Action not found?")
          return
        }
          console.log(currentAction)
        const zapRunMetadata = zapRunDetails?.metadata;

        if(currentAction.type?.id === "email"){
          const body = parse((currentAction.metadata as JsonObject)?.body as string, zapRunMetadata);
          const to = parse((currentAction.metadata as JsonObject)?.email as string, zapRunMetadata);
          await sendEmail(to , body);

          console.log(`Sending out email to ${to} body is ${body}`)
           
        }

        if(currentAction.type?.id === "send-sol"){
          const amount = parse((currentAction.metadata as JsonObject)?.amount as string, zapRunMetadata);
          const address = parse((currentAction.metadata as JsonObject)?.address as string, zapRunMetadata);
          console.log(`Sending out SOL of ${amount} to address ${address}`);
        }

      await new Promise((r) => setTimeout(r, 3000));

      console.log("prosseing done");

      const zapId = message.value?.toString();
      
      const lastStage = (zapRunDetails?.zap.actions.length || 1) - 1; 

      if(lastStage !== stage){
        await     producer.send({
          topic: TOPIC_NAME,
          messages: [{
            value: JSON.stringify({
              stage : stage + 1, 
              zapRunId
            })
          }]
        });
      }

      console.log("done")

      await consumer.commitOffsets([
        {
          topic: TOPIC_NAME,
          partition: partition,
          offset: (parseInt(message.offset) + 1).toString(),
        },
      ]);
    },
  });
}

main();
