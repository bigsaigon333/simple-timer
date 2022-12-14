import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import useToggle from "../hooks/use-toggle";
import { assert, isNonNullable } from "../utils/utils";

export type TimerState = "edit" | "ticking" | "paused" | "done";

const timerStateContext = createContext<TimerState | undefined>(undefined);

const timerStateDispatchContext = createContext<
  Dispatch<SetStateAction<TimerState>> | undefined
>(undefined);

const muteContext = createContext<[boolean, () => void] | undefined>(undefined);

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

export const useMute = (): [boolean, () => void] => {
  const context = useContext(muteContext);

  assert<[boolean, () => void]>(context, isNonNullable);

  return context;
};

export function TimerProvider({
  children,
}: {
  children?: ReactNode;
}): JSX.Element {
  const [timerState, setTimerState] = useState<TimerState>("edit");
  const [muted, toggle] = useToggle(false);

  return (
    <timerStateDispatchContext.Provider value={setTimerState}>
      <timerStateContext.Provider value={timerState}>
        <muteContext.Provider value={[muted, toggle]}>
          {children}
        </muteContext.Provider>
      </timerStateContext.Provider>
    </timerStateDispatchContext.Provider>
  );
}

export function getNextStateWhenSubmitted(state: TimerState): TimerState {
  switch (state) {
    case "edit":
      return "ticking";
    case "ticking":
      return "paused";
    case "paused":
      return "ticking";
    case "done":
      return "edit";
    default:
      throw new Error(`Unexpected state: ${state}`);
  }
}
