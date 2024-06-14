-- DropForeignKey
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_bodyPartId_fkey";

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_bodyPartId_fkey" FOREIGN KEY ("bodyPartId") REFERENCES "BodyPart"("id") ON DELETE CASCADE ON UPDATE CASCADE;
