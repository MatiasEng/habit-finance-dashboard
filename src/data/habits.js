const demo = {
  id: 1,
  userId: 1,
  title: "Drink Water",
  category: "Health",
  streak: 4,
  color: "blue",
  bestStreak: 12,
  completedDates: ["2025-04-05", "2025-04-04","2025-04-03"],
  createdAt: Date.now()
}

let habits = [];

habits.push({id: 1, userId: 1, title: "Morning Meditation", category: "Mental Health", streak: 7, bestStreak: 30, color: "purple", completedDates: ["2025-04-10", "2025-04-09", "2025-04-08", "2025-04-07", "2025-04-06", "2025-04-05", "2025-04-04"], createdAt: "2025-03-15"});
habits.push({id: 2, userId: 1, title: "Evening Walk", category: "Fitness", streak: 3, bestStreak: 45, color: "green", completedDates: ["2025-04-10", "2025-04-09", "2025-04-08"], createdAt: "2025-02-20"});
habits.push({id: 3, userId: 1, title: "Read 20 Pages", category: "Learning", streak: 15, bestStreak: 15, color: "orange", completedDates: ["2025-04-10", "2025-04-09", "2025-04-08", "2025-04-07", "2025-04-06", "2025-04-05", "2025-04-04", "2025-04-03", "2025-04-02", "2025-04-01", "2025-03-31", "2025-03-30", "2025-03-29", "2025-03-28", "2025-03-27"], createdAt: "2025-03-10"});
habits.push({id: 4, userId: 2, title: "No Sugar", category: "Nutrition", streak: 2, bestStreak: 21, color: "red", completedDates: ["2025-04-10", "2025-04-09"], createdAt: "2025-03-01"});
habits.push({id: 5, userId: 2, title: "Journaling", category: "Mental Health", streak: 0, bestStreak: 14, color: "blue", completedDates: [], createdAt: "2025-03-25"});
habits.push({id: 6, userId: 2, title: "Strength Training", category: "Fitness", streak: 5, bestStreak: 28, color: "teal", completedDates: ["2025-04-10", "2025-04-08", "2025-04-06", "2025-04-04", "2025-04-02"], createdAt: "2025-02-15"});
habits.push({id: 7, userId: 3, title: "Early to Bed", category: "Sleep", streak: 9, bestStreak: 9, color: "indigo", completedDates: ["2025-04-10", "2025-04-09", "2025-04-08", "2025-04-07", "2025-04-06", "2025-04-05", "2025-04-04", "2025-04-03", "2025-04-02"], createdAt: "2025-03-20"});
habits.push({id: 8, userId: 3, title: "Learn Spanish", category: "Learning", streak: 12, bestStreak: 60, color: "yellow", completedDates: ["2025-04-10", "2025-04-09", "2025-04-08", "2025-04-07", "2025-04-06", "2025-04-05", "2025-04-04", "2025-04-03", "2025-04-02", "2025-04-01", "2025-03-31", "2025-03-30"], createdAt: "2025-01-10"});
habits.push({id: 9, userId: 4, title: "Drink 2L Water", category: "Health", streak: 4, bestStreak: 12, color: "blue", completedDates: ["2025-04-10", "2025-04-09", "2025-04-08", "2025-04-07"], createdAt: "2025-03-05"});
habits.push({id: 10, userId: 4, title: "No Phone First Hour", category: "Productivity", streak: 6, bestStreak: 18, color: "gray", completedDates: ["2025-04-10", "2025-04-09", "2025-04-08", "2025-04-07", "2025-04-06", "2025-04-05"], createdAt: "2025-03-12"});
habits.push({id: 11, userId: 4, title: "Yoga Practice", category: "Fitness", streak: 8, bestStreak: 25, color: "pink", completedDates: ["2025-04-10", "2025-04-09", "2025-04-08", "2025-04-07", "2025-04-06", "2025-04-05", "2025-04-04", "2025-04-03"], createdAt: "2025-03-08"});
habits.push({id: 12, userId: 5, title: "Daily Planning", category: "Productivity", streak: 11, bestStreak: 35, color: "brown", completedDates: ["2025-04-10", "2025-04-09", "2025-04-08", "2025-04-07", "2025-04-06", "2025-04-05", "2025-04-04", "2025-04-03", "2025-04-02", "2025-04-01", "2025-03-31"], createdAt: "2025-02-28"});
habits.push({id: 13, userId: 5, title: "Medication Reminder", category: "Health", streak: 45, bestStreak: 45, color: "red", completedDates: ["2025-04-10", "2025-04-09", "2025-04-08", "2025-04-07", "2025-04-06", "2025-04-05", "2025-04-04", "2025-04-03", "2025-04-02", "2025-04-01"], createdAt: "2025-01-01"});
habits.push({id: 14, userId: 6, title: "Gratitude Journal", category: "Mental Health", streak: 3, bestStreak: 8, color: "green", completedDates: ["2025-04-10", "2025-04-09", "2025-04-08"], createdAt: "2025-03-18"});
habits.push({id: 15, userId: 6, title: "No Coffee After 2PM", category: "Health", streak: 7, bestStreak: 15, color: "orange", completedDates: ["2025-04-10", "2025-04-09", "2025-04-08", "2025-04-07", "2025-04-06", "2025-04-05", "2025-04-04"], createdAt: "2025-03-22"});
habits.push({id: 16, userId: 6, title: "Weekly Review", category: "Productivity", streak: 1, bestStreak: 5, color: "purple", completedDates: ["2025-04-10"], createdAt: "2025-03-30"});
habits.push({id: 17, userId: 7, title: "Stretching Routine", category: "Fitness", streak: 14, bestStreak: 22, color: "blue", completedDates: ["2025-04-10", "2025-04-09", "2025-04-08", "2025-04-07", "2025-04-06", "2025-04-05", "2025-04-04", "2025-04-03", "2025-04-02", "2025-04-01", "2025-03-31", "2025-03-30", "2025-03-29", "2025-03-28"], createdAt: "2025-02-14"});
habits.push({id: 18, userId: 7, title: "Digital Detox", category: "Mental Health", streak: 2, bestStreak: 7, color: "gray", completedDates: ["2025-04-10", "2025-04-09"], createdAt: "2025-04-05"});
habits.push({id: 19, userId: 8, title: "Coding Practice", category: "Learning", streak: 20, bestStreak: 20, color: "indigo", completedDates: ["2025-04-10", "2025-04-09", "2025-04-08", "2025-04-07", "2025-04-06", "2025-04-05", "2025-04-04", "2025-04-03", "2025-04-02", "2025-04-01", "2025-03-31", "2025-03-30", "2025-03-29", "2025-03-28", "2025-03-27", "2025-03-26", "2025-03-25", "2025-03-24", "2025-03-23", "2025-03-22"], createdAt: "2025-03-01"});
habits.push({id: 20, userId: 8, title: "Meal Prep", category: "Nutrition", streak: 5, bestStreak: 12, color: "teal", completedDates: ["2025-04-10", "2025-04-09", "2025-04-08", "2025-04-07", "2025-04-06"], createdAt: "2025-03-25"});
habits.push({id: 21, userId: 8, title: "Financial Tracking", category: "Productivity", streak: 9, bestStreak: 18, color: "green", completedDates: ["2025-04-10", "2025-04-09", "2025-04-08", "2025-04-07", "2025-04-06", "2025-04-05", "2025-04-04", "2025-04-03", "2025-04-02"], createdAt: "2025-03-11"});
habits.push({id: 22, userId: 9, title: "Morning Run", category: "Fitness", streak: 6, bestStreak: 30, color: "red", completedDates: ["2025-04-10", "2025-04-09", "2025-04-08", "2025-04-07", "2025-04-06", "2025-04-05"], createdAt: "2025-03-20"});
habits.push({id: 23, userId: 9, title: "Reading News", category: "Learning", streak: 25, bestStreak: 40, color: "blue", completedDates: ["2025-04-10", "2025-04-09", "2025-04-08", "2025-04-07", "2025-04-06", "2025-04-05", "2025-04-04", "2025-04-03", "2025-04-02", "2025-04-01", "2025-03-31", "2025-03-30", "2025-03-29", "2025-03-28", "2025-03-27", "2025-03-26", "2025-03-25", "2025-03-24", "2025-03-23", "2025-03-22", "2025-03-21", "2025-03-20", "2025-03-19", "2025-03-18", "2025-03-17"], createdAt: "2025-02-10"});
habits.push({id: 24, userId: 9, title: "Skin Care Routine", category: "Health", streak: 18, bestStreak: 18, color: "pink", completedDates: ["2025-04-10", "2025-04-09", "2025-04-08", "2025-04-07", "2025-04-06", "2025-04-05", "2025-04-04", "2025-04-03", "2025-04-02", "2025-04-01", "2025-03-31", "2025-03-30", "2025-03-29", "2025-03-28", "2025-03-27", "2025-03-26", "2025-03-25", "2025-03-24"], createdAt: "2025-03-08"});
habits.push({id: 25, userId: 10, title: "Practice Guitar", category: "Learning", streak: 4, bestStreak: 10, color: "yellow", completedDates: ["2025-04-10", "2025-04-09", "2025-04-08", "2025-04-07"], createdAt: "2025-03-28"});
habits.push({id: 26, userId: 10, title: "Clean Workspace", category: "Productivity", streak: 12, bestStreak: 20, color: "orange", completedDates: ["2025-04-10", "2025-04-09", "2025-04-08", "2025-04-07", "2025-04-06", "2025-04-05", "2025-04-04", "2025-04-03", "2025-04-02", "2025-04-01", "2025-03-31", "2025-03-30"], createdAt: "2025-03-05"});
habits.push({id: 27, userId: 10, title: "Drink Green Tea", category: "Nutrition", streak: 8, bestStreak: 15, color: "green", completedDates: ["2025-04-10", "2025-04-09", "2025-04-08", "2025-04-07", "2025-04-06", "2025-04-05", "2025-04-04", "2025-04-03"], createdAt: "2025-03-15"});
habits.push({id: 28, userId: 10, title: "Evening Reflection", category: "Mental Health", streak: 3, bestStreak: 8, color: "purple", completedDates: ["2025-04-10", "2025-04-09", "2025-04-08"], createdAt: "2025-04-02"});
habits.push({id: 29, userId: 10, title: "Stand Every Hour", category: "Health", streak: 1, bestStreak: 5, color: "blue", completedDates: ["2025-04-10"], createdAt: "2025-04-08"});
habits.push({id: 30, userId: 1, title: "Learn French", category: "Learning", streak: 2, bestStreak: 5, color: "red", completedDates: ["2025-04-10", "2025-04-09"], createdAt: "2025-04-05"});


export default habits;