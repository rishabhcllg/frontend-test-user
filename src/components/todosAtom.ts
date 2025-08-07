import { atom, selector } from "recoil";

export type Todo = {
    id: string;
    task: string;
    status: boolean;
}

const atomData = atom({
    key: "nu",
    default: {
        todos: [] as Todo[]
    }
})

export const todoSelector = selector({
    key: "todoSelector",
    get: ({ get }) => {
        return get(atomData).todos as Todo[]
    },
    set: ({ set }, newVal) => {
        set(atomData, (prev) => {
            return {
                ...prev,
                todos: newVal as Todo[]
            }
        })
    }
})