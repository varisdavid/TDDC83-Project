describe('Testilitest', function () {
	it('should not log in, FR045b', function (){
		browser.url("localhost:3000");
		//input email and password and click ok button.

	
		const inputEmail = $('#email');
		const inputpass = $('#password');
		inputEmail.setValue('Admin');
		inputpass.setValue('123456!a');
		$('#btn-login').click();
		
   


	expect(browser.getUrl()).to.not.equal('http://localhost:3000/');
		})
	it('should log in, FR045a', function (){
		// go to start site
		browser.url("localhost:3000");
		//input email and password and click ok button.

	
		const inputEmail = $('#email');
		const inputpass = $('#password');
		inputEmail.setValue('Admin@admin.se');
		inputpass.setValue('123456!a');
		$('#btn-login').click();
		browser.waitUntil(
        () => $('/html/body/div/div/div[1]/div/div[2]/a').getText() === 'Ryds vårdcentral',
        {
            timeout: 5000,
            timeoutMsg: 'expected text to be different after 5s'
        }
    );


	expect(browser.getUrl()).to.equal('http://localhost:3000/');
	
	})
	it('should log out, FR019', function (){
		//Här ska devs ändra id till Log-out eller vad vi nu sa.
		$('a.MuiTypography-root:nth-child(2)').click();
		browser.waitUntil(
        () => $('#btn-login').getText() === 'Logga in',
        {
            timeout: 5000,
            timeoutMsg: 'expected text to be different after 5s'
        });
    expect(browser.getUrl()).to.not.equal('http://localhost:3000/');
	})

	
})

//npmfund