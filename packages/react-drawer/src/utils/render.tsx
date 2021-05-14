import React, { isValidElement } from 'react';

export const trimText = (value: any, maxLength: number, overflowIndicator: string = '...'): string => {
  const valueStr = value.toString();
  const trimmedValue = valueStr.slice(0, maxLength - overflowIndicator.length);

  return valueStr.length > maxLength
    ? `${trimmedValue}${overflowIndicator}`
    : valueStr;
}

const addElement = (elements: React.ReactChild[], value: string, render?: (value: string) => React.ReactChild): void => {
  if (render) {
    elements.push(render(value));
  } else {
    elements.push(value);
  }
}

const findPattern = (patterns: PatternRender[], value: string): PatternRender | undefined => {
  return patterns.find(({ pattern }) => pattern.test(value));
}

export const renderText = (text: string, options?: RenderTextOptions): React.ReactChild[] => {
  const _options = {
    ...(options ?? {}),
    keywords: options?.keywords ?? {},
    patterns: options?.patterns ?? [],
  };

  const childs: React.ReactChild[] = [];
  let currentString = '';
  let isNumber = false;
  const keywords = Object.entries(_options.keywords);

  const addChild = (value: string, render?: (value: string) => React.ReactChild) => {
    addElement(childs, value, render);
    currentString = '';
  }

  const addString = (string: string) => {
    addChild(string, _options.renderString);
  }

  const addNumber = (number: string): void => {
    const endsWithDot = number.endsWith('.');

    if (endsWithDot) {
      number = number.slice(0, -1);
    }

    addChild(number, _options.renderNumber);

    if (endsWithDot) {
      addString('.');
    }
  }

  const isNumericChar = (char: string): boolean => {
    return char === '-' || char === '.';
  }

  const isCurrentNumber = (): boolean => {
    return currentString.length > 0 && isNumber && !isNumericChar(currentString);
  }

  const renderKeywords = (currentString: string) => {
    for (const [keyword, render] of keywords) {
      if (currentString.endsWith(keyword)) {
        const keywordlessString = currentString.slice(0, -keyword.length);

        if (keywordlessString.length) {
          if (isCurrentNumber()) {
            addNumber(keywordlessString);
          } else {
            addString(keywordlessString);
          }
        }

        addChild('', render);
        isNumber = false;
      }
    }
  }

  const renderPatterns = (currentString: string): boolean => {
    const pattern = findPattern(_options.patterns, currentString);

    if (pattern) {
      addChild(currentString, pattern.render);
      isNumber = false;
      return true;
    }

    return false;
  }

  for (const char of text) {
    const nextCurrentString = `${currentString}${char}`;
    if (nextCurrentString) {
      renderKeywords(nextCurrentString);

      if (renderPatterns(nextCurrentString)) {
        continue;
      }
    }

    if (char === ' ' || (isNaN(+char) && char !== '-' && (char !== '.' || currentString.includes('.')))) {
      if (isCurrentNumber()) {
        addNumber(currentString);
      }

      isNumber = false;
      currentString += char;
    } else {
      if (currentString.length && !isNumber) {
        addString(currentString);
      }

      isNumber = true;
      currentString += char;
    }
  }

  if (currentString.length) {
    renderKeywords(currentString);
    renderPatterns(currentString);

    if (isNumber && !isNumericChar(currentString)) {
      addNumber(currentString);
    } else {
      addString(currentString);
    }
  }

  return childs.map((c, i) => isValidElement(c) ? <React.Fragment key={i}>{c}</React.Fragment> : c);
}

export interface PatternRender {
  pattern: RegExp;
  render: (string: string) => React.ReactChild;
}

interface RenderTextOptions {
  renderNumber?: (number: string) => React.ReactChild;
  renderString?: (string: string) => React.ReactChild;
  keywords?: Record<string, () => React.ReactChild>;
  patterns?: PatternRender[];
}
