/**
 * @LastEditTime 2025/4/25 13:28
 * @Author   yang.yongzhi
 * @Description
 */

type TokenType = 'text' | 'bold' | 'italic' | 'link' | 'image' | 'list' | 'code' | 'blockquote';

type Token = {
  type: TokenType;
  text: TokenType;
  token?: Token[];
  finish: boolean;
}

class Parser {
  constructor() {
    console.log('Parser initialized');
  }

  parse(input: string): string {
    // Placeholder for parsing logic
    return input;
  }
}
