import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import yaml from 'js-yaml';
import { plantSchema } from './plant-schema';

const dir = join(__dirname, '../content/plants');
const files = readdirSync(dir).filter((f) => f.endsWith('.yaml'));

describe('plant YAML files match the schema', () => {
  it('has plant files', () => expect(files.length).toBeGreaterThan(0));
  for (const file of files) {
    it(file, () => {
      const data = yaml.load(readFileSync(join(dir, file), 'utf8'));
      const result = plantSchema.safeParse(data);
      const problems = result.success ? '' : result.error.issues.map((i) => i.path.join('.') + ': ' + i.message).join('\n');
      expect(problems).toBe('');
    });
  }
});
