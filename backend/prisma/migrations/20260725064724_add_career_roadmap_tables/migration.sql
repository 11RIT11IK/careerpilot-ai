-- CreateTable
CREATE TABLE "career_roadmaps" (
    "id" SERIAL NOT NULL,
    "currentRole" TEXT NOT NULL,
    "targetRole" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "currentSkills" TEXT,
    "timeline" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "career_roadmaps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "career_roadmap_steps" (
    "id" SERIAL NOT NULL,
    "phaseNumber" INTEGER NOT NULL,
    "phaseTitle" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "technologies" JSONB,
    "projects" JSONB,
    "certifications" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "roadmapId" INTEGER NOT NULL,

    CONSTRAINT "career_roadmap_steps_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "career_roadmaps" ADD CONSTRAINT "career_roadmaps_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "career_roadmap_steps" ADD CONSTRAINT "career_roadmap_steps_roadmapId_fkey" FOREIGN KEY ("roadmapId") REFERENCES "career_roadmaps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
