#include <iostream>
#include <sstream>
#include <vector>
#include <string>
#include <cctype>

enum class Token {
    Number,
    Plus,
    Minus,
    Multiply,
    Divide,
    End,
    Invalid
};

struct Lexeme {
    Token token;
    int value;
};

class Lexer {
public:
    explicit Lexer(const std::string& text) : text(text), pos(0) {}

    Lexeme getNextToken() {
        while (pos < text.size() && std::isspace(text[pos])) {
            pos++;
        }

        if (pos >= text.size()) {
            return {Token::End, 0};
        }

        char currentChar = text[pos];

        if (std::isdigit(currentChar)) {
            int value = 0;
            while (pos < text.size() && std::isdigit(text[pos])) {
                value = value * 10 + (text[pos] - '0');
                pos++;
            }
            return {Token::Number, value};
        }

        if (currentChar == '+') {
            pos++;
            return {Token::Plus, 0};
        }

        if (currentChar == '-') {
            pos++;
            return {Token::Minus, 0};
        }

        if (currentChar == '*') {
            pos++;
            return {Token::Multiply, 0};
        }

        if (currentChar == '/') {
            pos++;
            return {Token::Divide, 0};
        }

        return {Token::Invalid, 0};
    }

private:
    std::string text;
    size_t pos;
};

class Parser {
public:
    explicit Parser(Lexer& lexer) : lexer(lexer), currentToken(lexer.getNextToken()) {}

    int parse() {
        return expression();
    }

private:
    Lexer& lexer;
    Lexeme currentToken;

    void eat(Token token) {
        if (currentToken.token == token) {
            currentToken = lexer.getNextToken();
        } else {
            throw std::runtime_error("Invalid syntax");
        }
    }

    int expression() {
        int result = term();
        while (currentToken.token == Token::Plus || currentToken.token == Token::Minus) {
            if (currentToken.token == Token::Plus) {
                eat(Token::Plus);
                result += term();
            } else {
                eat(Token::Minus);
                result -= term();
            }
        }
        return result;
    }

    int term() {
        int result = factor();
        while (currentToken.token == Token::Multiply || currentToken.token == Token::Divide) {
            if (currentToken.token == Token::Multiply) {
                eat(Token::Multiply);
                result *= factor();
            } else {
                eat(Token::Divide);
                result /= factor();
            }
        }
        return result;
    }

    int factor() {
        if (currentToken.token == Token::Number) {
            int value = currentToken.value;
            eat(Token::Number);
            return value;
        }
        throw std::runtime_error("Invalid syntax");
    }
};

int main() {
    std::string input;
    std::cout << "Digite uma expressão: ";
    std::getline(std::cin, input);

    try {
        Lexer lexer(input);
        Parser parser(lexer);
        int result = parser.parse();
        std::cout << "Resultado: " << result << std::endl;
    } catch (const std::runtime_error& e) {
        std::cerr << "Erro: " << e.what() << std::endl;
    }

    return 0;
}
