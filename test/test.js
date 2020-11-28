describe('Testilitest', function () {
	it('ladda url', function (){
	browser.url('./overview/patients')
	$('/html/body/div/div/div[3]/div/div/div[3]/div/div/div/button[1]').click()
	new Promise(r=> setTimeout(r,1500));
	})
})

//npmfund