import { plurality } from '@lp-labs/plurality-vote';
if (plurality(['a', 'b'], ['a', 'a', 'b'])[0].score !== 2) throw new Error('Vote');
// @ts-expect-error invalid argument must be rejected by declarations
plurality([1, 2], ['a']);
