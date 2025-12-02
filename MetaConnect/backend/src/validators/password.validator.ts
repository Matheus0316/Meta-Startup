import { BadRequestException } from '@nestjs/common';

export class PasswordValidator {
  private static readonly MIN_LENGTH = 8;
  private static readonly MIN_NUMBERS = 1;
  private static readonly MIN_SPECIAL_CHARS = 1;
  private static readonly MIN_UPPERCASE = 1;
  private static readonly MIN_LOWERCASE = 1;

  /**
   * Validate password strength
   * @param password - Password to validate
   * @returns Object with validation result and errors
   */
  static validatePassword(password: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!password) {
      errors.push('Password is required');
      return { isValid: false, errors };
    }

    // Check minimum length
    if (password.length < this.MIN_LENGTH) {
      errors.push(`Password must be at least ${this.MIN_LENGTH} characters long`);
    }

    // Check for numbers
    const numberCount = (password.match(/\d/g) || []).length;
    if (numberCount < this.MIN_NUMBERS) {
      errors.push(`Password must contain at least ${this.MIN_NUMBERS} number(s)`);
    }

    // Check for special characters
    const specialCharCount = (password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g) || []).length;
    if (specialCharCount < this.MIN_SPECIAL_CHARS) {
      errors.push(`Password must contain at least ${this.MIN_SPECIAL_CHARS} special character(s)`);
    }

    // Check for uppercase letters
    const uppercaseCount = (password.match(/[A-Z]/g) || []).length;
    if (uppercaseCount < this.MIN_UPPERCASE) {
      errors.push(`Password must contain at least ${this.MIN_UPPERCASE} uppercase letter(s)`);
    }

    // Check for lowercase letters
    const lowercaseCount = (password.match(/[a-z]/g) || []).length;
    if (lowercaseCount < this.MIN_LOWERCASE) {
      errors.push(`Password must contain at least ${this.MIN_LOWERCASE} lowercase letter(s)`);
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate password and throw exception if invalid
   * @param password - Password to validate
   * @throws BadRequestException if password is invalid
   */
  static validatePasswordOrThrow(password: string): void {
    const validation = this.validatePassword(password);
    if (!validation.isValid) {
      throw new BadRequestException({
        message: 'Password validation failed',
        errors: validation.errors,
      });
    }
  }

  /**
   * Generate password strength score (0-100)
   * @param password - Password to score
   * @returns Strength score
   */
  static getPasswordStrength(password: string): number {
    if (!password) return 0;

    let score = 0;
    const checks = [
      { test: password.length >= 8, points: 25 },
      { test: password.length >= 12, points: 10 },
      { test: /[a-z]/.test(password), points: 15 },
      { test: /[A-Z]/.test(password), points: 15 },
      { test: /\d/.test(password), points: 15 },
      { test: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password), points: 20 },
    ];

    checks.forEach(check => {
      if (check.test) score += check.points;
    });

    return Math.min(score, 100);
  }
}
