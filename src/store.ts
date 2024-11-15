import { create } from "zustand";

/*

taskStatus

0 - Задание не взято
1 - Задание в работе
2 - Задание на модерации
3 - Задание выполнено

*/

interface taskType {
  description: string;
  title: string;
  categoryId: number;
  points: number;
  id: number;
  status: 0 | 1 | 2 | 3;
  recommended: boolean;
}

interface taskCategoryType {
  id: number;
  title: string;
}

interface Store {
  tasks: taskType[];
  //   taskCategory: taskCategoryType[]; // TODO
  //   addTask: (newTask: taskType) => void; // TODO
  setTasks: (tasksArray: taskType[]) => void;
  //   setTasksCategory: (tasksCategoryArray: taskCategoryType[]) => void; // TODO
  // other properties...
  points: number;
  setPoints: (points: number) => void;
  recommendedTasks: taskType[];
  setRecommendedTasks: (tasksArray: taskType[]) => void;
  userName: string;
  userSurname: string;
  userDefaultPhotoURL: string;
  userVKId: number;
  setUserDefaultPhotoURL: (userDefaultPhotoURL: string) => void;
  setUserData: (userData: {
    userName: string;
    userSurname: string;
    userDefaultPhotoURL: string;
    userVKId: number;
  }) => void;
  taskOptions: { value: number; label: string }[];
  selectTaskType: number;
  setSelectTaskType: (selectTaskType: number) => void;
  taskCategoryOptions: taskCategoryType[];
  selectTaskCategoryType: number;
  setSelectTaskCategoryType: (selectTaskType: number) => void;
  setTaskCategoryOptions: (taskCategoryOptions: taskCategoryType[]) => void;
  onboardingProcessIsUnderwayNow: boolean;
  setOnboardingProcessIsUnderwayNow: (
    onboardingProcessIsUnderwayNow: boolean
  ) => void;
  userBestCategories: any[]; // Replace with actual type if known
  setUserBestCategories: (userBestCategories: any[]) => void; // Replace with actual type if known
  studentsRating: any[]; // Replace with actual type if known
  setStudentsRating: (studentsRating: any[]) => void; // Replace with actual type if known
  isLoadingUserAvatar: boolean;
  setIsLoadingUserAvatar: (isLoadingUserAvatar: boolean) => void;
}

export const useStore = create<Store>()((set) => ({
  setTasks: (tasksArray) => set((state) => ({ tasks: tasksArray })),
  updateTask: (newTask) =>
    set((state) => ({
      tasks: [...state.tasks.filter((task) => task.id != newTask.id), newTask],
    })),
  tasks: [],
  points: 0,
  setPoints: (points) => set((state) => ({ points: points })),

  recommendedTasks: [],
  setRecommendedTasks: (tasksArray) =>
    set(() => ({ recommendedTasks: tasksArray })),

  userName: "",
  userSurname: "",
  userDefaultPhotoURL: "",
  userVKId: 0,

  setUserDefaultPhotoURL: (userDefaultPhotoURL) =>
    set((state) => ({ userDefaultPhotoURL })),

  setUserData: ({ userName, userSurname, userDefaultPhotoURL, userVKId }) =>
    set((state) => ({
      userName,
      userSurname,
      userDefaultPhotoURL,
      userVKId,
    })),

  taskOptions: [
    {
      value: 0,
      label: "Все задания",
    },

    {
      value: 1,
      label: "Задания в процессе",
    },

    {
      value: 3,
      label: "Выполненные задания",
    },
  ],

  selectTaskType: 0,
  setSelectTaskType: (selectTaskType) =>
    set((state) => ({ selectTaskType: selectTaskType })),

  taskCategoryOptions: [],
  selectTaskCategoryType: 32,
  setSelectTaskCategoryType: (selectTaskType) =>
    set((state) => ({ selectTaskCategoryType: selectTaskType })),
  setTaskCategoryOptions: (taskCategoryOptions) =>
    set(() => ({ taskCategoryOptions: taskCategoryOptions })),

  onboardingProcessIsUnderwayNow: false,
  setOnboardingProcessIsUnderwayNow: (onboardingProcessIsUnderwayNow) =>
    set(() => ({
      onboardingProcessIsUnderwayNow: onboardingProcessIsUnderwayNow,
    })),

  userBestCategories: [],

  setUserBestCategories: (userBestCategories) =>
    set(() => ({ userBestCategories: userBestCategories })),

  studentsRating: [],
  setStudentsRating: (studentsRating) =>
    set(() => ({ studentsRating: studentsRating })),

  isLoadingUserAvatar: false,
  setIsLoadingUserAvatar: (isLoadingUserAvatar) =>
    set(() => ({ isLoadingUserAvatar: isLoadingUserAvatar })),
}));
