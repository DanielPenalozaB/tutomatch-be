import { BadRequestException } from '@nestjs/common';

/**
 * Validates that an email matches one of the allowed domain patterns:
 * - user@estudiante.uniajc.edu.co
 * - user@profesores.uniajc.edu.co
 * - user@admon.uniajc.edu.co
 *
 * @param email The email to validate
 * @returns true if the email is valid, otherwise throws an exception
 */
export function validateUniajcEmail(email: string): boolean {
  const validDomains = [
    'estudiante.uniajc.edu.co',
    'profesores.uniajc.edu.co',
    'admon.uniajc.edu.co',
  ];

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new BadRequestException('Invalid email format');
  }

  // Domain validation
  const domain = email.split('@')[1];
  if (!validDomains.includes(domain)) {
    throw new BadRequestException(
      `Email domain not allowed. Valid domains are: ${validDomains.join(', ')}`,
    );
  }

  return true;
}