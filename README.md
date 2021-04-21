# nodejs-search-text
Comparing performance of text search using NodeJs.

Related to medium article:

https://medium.com/codex/achieve-the-best-performance-search-a-string-in-file-using-nodejs-6a0f2a3b6cfa

## Reading full File
- Huge file ( 800 MB ): unable to execute
- Big file ( 150 MB ): 1400 ms
- Medium file ( 3 MB ): 30 ms
- Small file ( 2 KB ): 1 ms

## Using Streams
- Huge file ( 800 MB ): 8100 ms
- Big file ( 150 MB ): 1400 ms
- Medium file ( 3 MB ): 32 ms
- Small file ( 2 KB ): 1 ms

## Wrapping OS calls
- Huge file ( 800 MB ): 1851 ms
- Big file ( 150 MB ): 389 ms
- Medium file ( 3 MB ): 51 ms
- Small file ( 2 KB ): 47 ms
