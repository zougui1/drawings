import { FlatDrawingData } from '../../types';

export const checkDataFormat = (data: FlatDrawingData[]): void => {
  const checkedData = data.map(data => {
    const messages: string[] = [];

    if (typeof data.name !== 'string') {
      messages.push(`The name must be a string. Got "${data.name}".`);
    } else if (!data.name.trim()) {
      messages.push('The name must be non-empty a string.');
    }

    if ('zIndex' in data && !Number.isFinite(data.zIndex)) {
      messages.push(`The zIndex must be a number. Got "${data.zIndex}".`);
    }

    if ('stroke' in data && typeof data.stroke !== 'string') {
      messages.push(`The stroke must be a string. Got "${data.stroke}".`);
    }

    if ('fill' in data && typeof data.fill !== 'string') {
      messages.push(`The fill must be a string. Got "${data.fill}".`);
    }

    if ('strokeWidth' in data && !Number.isFinite(data.strokeWidth)) {
      messages.push(`The strokeWidth must be a number. Got "${data.strokeWidth}".`);
    }

    return {
      data,
      messages,
    };
  });

  const invalidData = checkedData.filter(data => data.messages.length > 0);

  if (invalidData.length) {
    const errorMessages = invalidData.map(data => {
      const label = `${data.data.path ?? 'ROOT'}: "${data.data.name}":`;
      const messages = data.messages.join('\n  ');
      return `${label}\n  ${messages}`;
    });

    throw new Error(`Invalid drawing data format:\n${errorMessages}`);
  }
}
