function main() {
  for (var i=0; i<10; i++)
    console.log('log', i);
  for (var i=0; i<10; i++)
    console.error('error', i);
  for (var i=0; i<10; i++)
    console.log('log', i);
  for (var i=0; i<10; i++)
    console.error('error', i);
  throw 0;
}
main();
