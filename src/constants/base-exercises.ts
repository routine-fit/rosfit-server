import { MuscleGroup } from '@prisma/client';

export const baseExercises: { name: Record<'es' | 'en', string>; muscleGroup: MuscleGroup }[] = [
  {
    name: { en: 'Push-Up', es: 'Flexión de brazos' },
    muscleGroup: 'CHEST',
  },
  {
    name: { en: 'Bench Press', es: 'Press de banca' },
    muscleGroup: 'CHEST',
  },
  {
    name: { en: 'Chest Fly', es: 'Aperturas de pecho' },
    muscleGroup: 'CHEST',
  },
  {
    name: { en: 'Incline Dumbbell Press', es: 'Press inclinado con mancuernas' },
    muscleGroup: 'CHEST',
  },
  {
    name: { en: 'Decline Push-Up', es: 'Flexión declinada' },
    muscleGroup: 'CHEST',
  },
  {
    name: { en: 'Cable Crossover', es: 'Cruce de cables' },
    muscleGroup: 'CHEST',
  },
  {
    name: { en: 'Dumbbell Pullover', es: 'Pull-over con mancuerna' },
    muscleGroup: 'CHEST',
  },
  {
    name: { en: 'Push-Up with Rotation', es: 'Flexión con rotación' },
    muscleGroup: 'CHEST',
  },
  {
    name: { en: 'Clapping Push-Up', es: 'Flexión con aplauso' },
    muscleGroup: 'CHEST',
  },
  {
    name: { en: 'Pull-Up', es: 'Dominadas' },
    muscleGroup: 'BACK',
  },
  {
    name: { en: 'Lat Pulldown', es: 'Jalón al pecho' },
    muscleGroup: 'BACK',
  },
  {
    name: { en: 'Bent Over Row', es: 'Remo inclinado' },
    muscleGroup: 'BACK',
  },
  {
    name: { en: 'Single Arm Dumbbell Row', es: 'Remo a una mano con mancuerna' },
    muscleGroup: 'BACK',
  },
  {
    name: { en: 'T-Bar Row', es: 'Remo en T' },
    muscleGroup: 'BACK',
  },
  {
    name: { en: 'Seated Cable Row', es: 'Remo sentado en cable' },
    muscleGroup: 'BACK',
  },
  {
    name: { en: 'Hyperextension', es: 'Hiperextensión' },
    muscleGroup: 'BACK',
  },
  {
    name: { en: 'Wide Grip Pull-Up', es: 'Dominada con agarre ancho' },
    muscleGroup: 'BACK',
  },
  {
    name: { en: 'Chest Supported Row', es: 'Remo con soporte en pecho' },
    muscleGroup: 'BACK',
  },
  {
    name: { en: 'Straight Arm Pulldown', es: 'Jalón con brazos rectos' },
    muscleGroup: 'BACK',
  },
  {
    name: { en: 'Bicep Curl', es: 'Curl de bíceps' },
    muscleGroup: 'ARMS',
  },
  {
    name: { en: 'Tricep Dip', es: 'Fondos de tríceps' },
    muscleGroup: 'ARMS',
  },
  {
    name: { en: 'Hammer Curl', es: 'Curl martillo' },
    muscleGroup: 'ARMS',
  },
  {
    name: { en: 'Overhead Tricep Extension', es: 'Extensión de tríceps por encima de la cabeza' },
    muscleGroup: 'ARMS',
  },
  {
    name: { en: 'Concentration Curl', es: 'Curl de concentración' },
    muscleGroup: 'ARMS',
  },
  {
    name: { en: 'Cable Tricep Pushdown', es: 'Extensión de tríceps en cable' },
    muscleGroup: 'ARMS',
  },
  {
    name: { en: 'Preacher Curl', es: 'Curl en banco Scott' },
    muscleGroup: 'ARMS',
  },
  {
    name: { en: 'Reverse Curl', es: 'Curl invertido' },
    muscleGroup: 'ARMS',
  },
  {
    name: { en: 'Close Grip Bench Press', es: 'Press de banca con agarre estrecho' },
    muscleGroup: 'ARMS',
  },
  {
    name: { en: 'Shoulder Press', es: 'Press de hombros' },
    muscleGroup: 'SHOULDERS',
  },
  {
    name: { en: 'Lateral Raise', es: 'Elevación lateral' },
    muscleGroup: 'SHOULDERS',
  },
  {
    name: { en: 'Front Raise', es: 'Elevación frontal' },
    muscleGroup: 'SHOULDERS',
  },
  {
    name: { en: 'Reverse Fly', es: 'Aperturas inversas' },
    muscleGroup: 'SHOULDERS',
  },
  {
    name: { en: 'Face Pull', es: 'Face pull' },
    muscleGroup: 'SHOULDERS',
  },
  {
    name: { en: 'Arnold Press', es: 'Press Arnold' },
    muscleGroup: 'SHOULDERS',
  },
  {
    name: { en: 'Upright Row', es: 'Remo vertical' },
    muscleGroup: 'SHOULDERS',
  },
  {
    name: { en: 'Shrug', es: 'Encogimiento de hombros' },
    muscleGroup: 'SHOULDERS',
  },
  {
    name: { en: 'Squat', es: 'Sentadilla' },
    muscleGroup: 'LEGS',
  },
  {
    name: { en: 'Lunge', es: 'Zancada' },
    muscleGroup: 'LEGS',
  },
  {
    name: { en: 'Deadlift', es: 'Peso muerto' },
    muscleGroup: 'LEGS',
  },
  {
    name: { en: 'Leg Press', es: 'Prensa de pierna' },
    muscleGroup: 'LEGS',
  },
  {
    name: { en: 'Leg Extension', es: 'Extensión de pierna' },
    muscleGroup: 'LEGS',
  },
  {
    name: { en: 'Leg Curl', es: 'Curl de pierna' },
    muscleGroup: 'LEGS',
  },
  {
    name: { en: 'Calf Raise', es: 'Elevación de talones' },
    muscleGroup: 'LEGS',
  },
  {
    name: { en: 'Bulgarian Split Squat', es: 'Sentadilla búlgara' },
    muscleGroup: 'LEGS',
  },
  {
    name: { en: 'Step-Up', es: 'Subida a banco' },
    muscleGroup: 'LEGS',
  },
  {
    name: { en: 'Hip Thrust', es: 'Elevación de cadera' },
    muscleGroup: 'LEGS',
  },
  {
    name: { en: 'Crunch', es: 'Abdominales cortos' },
    muscleGroup: 'ABS',
  },
  {
    name: { en: 'Plank', es: 'Plancha' },
    muscleGroup: 'ABS',
  },
  {
    name: { en: 'Bicycle Crunch', es: 'Abdominales bicicleta' },
    muscleGroup: 'ABS',
  },
  {
    name: { en: 'Russian Twist', es: 'Giro ruso' },
    muscleGroup: 'ABS',
  },
  {
    name: { en: 'Leg Raise', es: 'Elevación de piernas' },
    muscleGroup: 'ABS',
  },
  {
    name: { en: 'Mountain Climber', es: 'Escalador' },
    muscleGroup: 'ABS',
  },
  {
    name: { en: 'Hanging Leg Raise', es: 'Elevación de piernas colgado' },
    muscleGroup: 'ABS',
  },
  {
    name: { en: 'V-Up', es: 'V-Up' },
    muscleGroup: 'ABS',
  },
  {
    name: { en: 'Side Plank', es: 'Plancha lateral' },
    muscleGroup: 'ABS',
  },
  {
    name: { en: 'Cable Crunch', es: 'Crunch en polea' },
    muscleGroup: 'ABS',
  },
];
