import { Command } from '../../../commands';
import { Path } from '../../../drawing-elements';
import { IStackFrame } from '../../../types';

export const getStackFrames = (path: Path, commands: Command[]): { path: IStackFrame, lastCommand: IStackFrame } | undefined => {
  const lastCommand = commands[commands.length - 1];
  const pathStackFrame = path.getStackFrame();

  if (!lastCommand || !pathStackFrame) {
    return;
  }

  const lastCommandStackFrame = lastCommand.getStackFrame();

  if (!lastCommandStackFrame) {
    return;
  }

  return {
    path: pathStackFrame,
    lastCommand: lastCommandStackFrame,
  };
}
