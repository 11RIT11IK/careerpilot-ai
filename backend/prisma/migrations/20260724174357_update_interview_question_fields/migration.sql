/*
  Warnings:

  - You are about to drop the column `expectedAnswer` on the `interview_questions` table. All the data in the column will be lost.
  - Added the required column `difficulty` to the `interview_questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expectedTopics` to the `interview_questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "interview_questions" DROP COLUMN "expectedAnswer",
ADD COLUMN     "difficulty" TEXT NOT NULL,
ADD COLUMN     "expectedTopics" JSONB NOT NULL,
ADD COLUMN     "referenceAnswer" TEXT;
