// spec.js

describe('ADF Demo App', function() {

 it('test', function() {

      browser.get('http://qaexercise.envalfresco.com/settings');
      expect(browser.getCurrentUrl()).toBe('http://qaexercise.envalfresco.com/settings');

      //Select ECM option from dropdown and submit
      element(by.css('div.mat-select-arrow-wrapper')).click();
      element(by.xpath("//mat-option//span[text()=' ECM ']")).click();
      element(by.id('host-button')).click();      

      //Login with guest credentials
      expect(browser.getCurrentUrl()).toBe('http://qaexercise.envalfresco.com/login');
      element(by.id('username')).sendKeys('guest@example.com');
      element(by.id('password')).sendKeys('Password');
      element(by.id('login-button')).click();

      expect(element(by.css('span.adf-app-title')).getText()).toEqual('ADF Demo Application'); // Check that lable is displayed on the new page

      //Go to files and create a new folder
      browser.get('http://qaexercise.envalfresco.com/files');

      let newFolderButton = element(by.css("button[data-automation-id='create-new-folder']"));
      expect(newFolderButton.isDisplayed()).toBe(true);
      newFolderButton.click();
      browser.sleep(500);

      //Create a new folder     
      let createFolderDialogWindow = element(by.css('mat-dialog-container.mat-dialog-container'));
      let folderName = 'smv36';

      //Dialog window is displayed & New Folder title is displayed
      expect(createFolderDialogWindow.isDisplayed()).toBe(true);
      expect(element(by.css('h2.mat-dialog-title')).getText()).toEqual('New folder');

      let nameInput = element(by.id('adf-folder-name-input'));
      let createButton = element(by.id('adf-folder-create-button'));

      nameInput.sendKeys(folderName);
      createButton.click();
      
      //Folder is created
      expect(element(by.css("div.adf-datatable-body span[title='"+folderName+"']")).isDisplayed()).toBe(true);

      //create same folder -> validation is displayed
      newFolderButton.click();
      browser.sleep(500);
      
      nameInput.sendKeys(folderName);
      createButton.click();
      
      expect(element(by.css("snack-bar-container.mat-snack-bar-container span")).getText()).toBe("There's already a folder with this name. Try a different name.");
      expect(createFolderDialogWindow.isDisplayed()).toBe(true); //Dialog window still displayed

      //Click on Dialog window Cancel button
      element(by.id('adf-folder-cancel-button')).click();
      
      //Delete the folder
      element(by.css("div[data-automation-id='"+folderName+"']+div button[title='Content actions']")).click();  //click on (3 dots)
      element(by.css("button[aria-label='Delete']")).click(); //click on delete button
      
      // expect(element(by.css("snack-bar-container.mat-snack-bar-container span")).getText()).toEqual(folderName+" deleted"); //Message of folder is deleted is displayed
  });

});