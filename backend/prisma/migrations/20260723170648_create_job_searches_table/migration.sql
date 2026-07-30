-- CreateTable
CREATE TABLE "job_searches" (
    "id" SERIAL NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "idealJobDesc" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "job_searches_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "job_searches" ADD CONSTRAINT "job_searches_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
