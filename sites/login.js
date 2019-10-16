async function login(page){
  await page.type('input[name="username"]', config.username);
  await page.type('input[name="password"]', config.password);
  const promise = page.waitForNavigation({ waitUntil: 'load' });
  await page.click('input[type="submit"]');
  await promise;
}

module.exports = {
  login
}