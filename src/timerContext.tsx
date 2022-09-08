import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { assert, isNonNullable } from "./utils";

export type TimerState = "idle" | "ticking" | "paused" | "done";

const timerStateContext = createContext<TimerState | undefined>(undefined);

const timerStateDispatchContext = createContext<
  Dispatch<SetStateAction<TimerState>> | undefined
>(undefined);

export const useTimerState = (): TimerState => {
  const context = useContext(timerStateContext);

  assert<TimerState>(context, isNonNullable);

  return context;
};

export const useTimerStateDispatch = (): Dispatch<
  SetStateAction<TimerState>
> => {
  const context = useContext(timerStateDispatchContext);

  assert<Dispatch<SetStateAction<TimerState>>>(context, isNonNullable);

  return context;
};

export function TimerProvider({
  children,
}: {
  children?: ReactNode;
}): JSX.Element {
  const [timerState, setTimerState] = useState<TimerState>("idle");

  return (
    <timerStateDispatchContext.Provider value={setTimerState}>
      <timerStateContext.Provider value={timerState}>
        {children}
      </timerStateContext.Provider>
    </timerStateDispatchContext.Provider>
  );
}