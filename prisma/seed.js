const fs = require("fs");
const path = require("path");

const seedBodyPartsAndWorkouts = async () => {
  try {
    // Read the bodyParts data from the JSON file
    const bodyPartsData = JSON.parse(
      fs.readFileSync("./../src/asset/bodyParts.json", "utf-8")
    );

    // Read the workoutsData from the JSON file
    const workoutsData = JSON.parse(
      fs.readFileSync("./../src/asset/workouts.json", "utf-8")
    );

    for (const name of bodyPartsData) {
      const bodyPart = await prisma.bodyPart.upsert({
        where: { name },
        update: {},
        create: { name },
      });

      const workouts = workoutsData[name].map((workoutName) => ({
        name: workoutName,
        bodyPartId: bodyPart.id,
      }));

      await prisma.workout.createMany({
        data: workouts,
      });

      console.log(`Seeded body part: ${name} with ${workouts.length} workouts`);
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

const main = async () => {
  await seedBodyPartsAndWorkouts();
};

main();
