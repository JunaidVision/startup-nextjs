export async function getsingleData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
    next: { revalidate: 60 }, // revalidate every 60s
    cache: 'force-cache',
  });
  console.log('✅ Server getsingleData fetch at', new Date().toISOString());
  return res.json();
}