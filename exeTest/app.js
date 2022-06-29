const express = require('express');
const morgan = require('morgan');
const path = require('path');

const playwright = require('playwright');

const app = express();
app.set('view engine', 'html');
app.set('port', 8080);

app.use(morgan('dev'));
// app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));



app.get("/", (req, res)=>{

    res.sendFile(path.join(__dirname, './public', 'index.html'));
})

app.post("/minwon", async(req, res)=>{

    console.log("minwon 통신");
    const id = req.body.userId;
    const pw = req.body.userPw;
    
    
    const browser = await playwright.chromium.launch({
        headless: false,
        // slowMo:3000
    });

    const context = await browser.newContext({});
    const page = await context.newPage();

    await page.goto('https://www.gov.kr/');
  // Go to https://www.gov.kr/portal/main
  await page.goto('https://www.gov.kr/portal/main');
  // Click img[alt="닫기"]
  await page.locator('img[alt="닫기"]').click();
//   await expect(page).toHaveURL('https://www.gov.kr/portal/main#none');
  // Click a:has-text("로그인") >> nth=0
  await page.locator('a:has-text("로그인")').first().click();
//   await expect(page).toHaveURL('https://www.gov.kr/nlogin/?Mcode=10003');
  // Click [id="아이디"]
  await page.locator('[id="아이디"]').click();
  // Click text=아이디 비밀번호 아이디 로그인 >> [placeholder="아이디를 입력하세요"]
  await page.locator('text=아이디 비밀번호 아이디 로그인 >> [placeholder="아이디를 입력하세요"]').click();
  // Fill text=아이디 비밀번호 아이디 로그인 >> [placeholder="아이디를 입력하세요"]
  await page.locator('text=아이디 비밀번호 아이디 로그인 >> [placeholder="아이디를 입력하세요"]').fill('');
  // Click [id="아이디"]
  await page.locator('[id="아이디"]').click();
  // Click text=아이디 비밀번호 아이디 로그인 >> [placeholder="아이디를 입력하세요"]
  await page.locator('text=아이디 비밀번호 아이디 로그인 >> [placeholder="아이디를 입력하세요"]').click();
  // Fill text=아이디 비밀번호 아이디 로그인 >> [placeholder="아이디를 입력하세요"]
  await page.locator('text=아이디 비밀번호 아이디 로그인 >> [placeholder="아이디를 입력하세요"]').fill(id);
  // Press Tab
  await page.locator('text=아이디 비밀번호 아이디 로그인 >> [placeholder="아이디를 입력하세요"]').press('Tab');
  // Click [placeholder="비밀번호를 입력하세요"]
  await page.locator('[placeholder="비밀번호를 입력하세요"]').click();
  // Fill [placeholder="비밀번호를 입력하세요"]
  await page.locator('[placeholder="비밀번호를 입력하세요"]').fill(pw);
  // Click button:has-text("아이디 로그인")
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.locator('button:has-text("아이디 로그인")').click();


  res.send("<h1>정상 로그인</h1>")
})
app.get("/hometax", async (req, res)=>{

    console.log("hometax 로그인")
    const id = req.body.userId;
    const pw = req.body.userPw;
    

    const browser = await playwright.chromium.launch({
        headless: false,
        // slowMo:3000
    });

   

    const context = await browser.newContext({});
    const page = await context.newPage();

 // Go to https://www.hometax.go.kr/
 await page.goto('https://www.hometax.go.kr/');
 console.log("1");

 // Go to https://www.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/pp/index.xml
 await page.goto('https://www.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/pp/index.xml');
 console.log("2");
 // Click #group88615547
 await page.locator('#group88615547').click();
 //await expect(page).toHaveURL('https://www.hometax.go.kr/websquare/websquare.wq?w2xPath=/ui/pp/index_pp.xml');
 console.log("3");
 // Click a:has-text("아이디 로그인")
 await page.mouse.move(0, 100);
//  await page.frameLocator('iframe[name="txppIframe"]').locator('span:has-text("아이디 로그인")').click();
// const orderSent = page.locator('#anchor15');
// await orderSent.waitFor();

 console.log("4");
 await page.frameLocator('iframe[name="txppIframe"]').locator('a:has-text("아이디 로그인")').click();
 await page.locator('id=anchor15').click();
 console.log("4-1");
//  await page.locator('#anchor15').click();
 console.log("4-2");
 
 // Click [placeholder="아이디"]
 await page.frameLocator('iframe[name="txppIframe"]').locator('[placeholder="아이디"]').click();
 console.log("5");
 // Fill [placeholder="아이디"]
 await page.frameLocator('iframe[name="txppIframe"]').locator('[placeholder="아이디"]').fill(id);
 console.log("6");
 // Press Tab
 await page.frameLocator('iframe[name="txppIframe"]').locator('[placeholder="아이디"]').press('Tab');
 console.log("7");
 // Fill [placeholder="비밀번호"]
 await page.frameLocator('iframe[name="txppIframe"]').locator('[placeholder="비밀번호"]').fill(pw);
 console.log("8");
 // Press Enter
 await Promise.all([
   page.waitForNavigation(/*{ url: 'https://www.hometax.go.kr/websquare/websquare.wq?w2xPath=/ui/pp/index.xml&tmIdx=0&tm2lIdx=100907&tm3lIdx=' }*/),
   page.frameLocator('iframe[name="txppIframe"]').locator('[placeholder="비밀번호"]').press('Enter')
 ]);
});

app.listen(app.get('port'), ()=>{
    console.log("Web Server Open: "+ app.get('port'));
})
