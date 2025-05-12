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
  complete: boolean
}

class Parser {
  constructor() {
    console.log('Parser initialized');
  }

  parse(input: string): string {
    // 将所有换行符替换为 \n
    input = input.replace(/(\r\n|\n|\r)/g, '\n');
    // 制表符替换为 4 个空格
    input = input.replace(/\t/g, '    ');
    return input;
  }

  parseInline() {

  }

}
