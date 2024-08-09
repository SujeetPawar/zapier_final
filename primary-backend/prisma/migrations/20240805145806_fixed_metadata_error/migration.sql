-- AlterTable
ALTER TABLE "Action" ADD COLUMN     "metadata" JSONB NOT NULL DEFAULT '{}';

-- AlterTable
ALTER TABLE "Trigger" ALTER COLUMN "metadata" SET DEFAULT '{}';
