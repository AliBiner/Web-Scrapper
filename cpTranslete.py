from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
import time
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By;
from selenium.webdriver import ActionChains;
import sys
import json



# JSON verisini Python sözlüğüne dönüştür


driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()))
driver.maximize_window()

driver.get("https://translate.google.com/?hl=tr&tab=TT&sl=tr&tl=en&op=translate")

data_from_node = sys.stdin.read()
input_data = json.loads(data_from_node)
def runProcess():

    a=0
    print("Fonsksiyon",a)
    f= open("testEn.txt","a")
    while a < 12:
        
        #Launch
        driver.find_element(By.XPATH,"/html/body/c-wiz/div/div[2]/c-wiz/div[2]/c-wiz/div[1]/div[2]/div[2]/c-wiz[1]/span/span/div/textarea").send_keys(input_data[a])
        time.sleep(4)
        #Get Target Trasnlete
        headerEn= driver.find_element(By.XPATH,"//span[@class='ryNqvb']").text
        headerEn = turkish_to_english(headerEn)
        #Clear Source Area
        sourceHeader = driver.find_element(By.XPATH,"/html/body/c-wiz/div/div[2]/c-wiz/div[2]/c-wiz/div[1]/div[2]/div[2]/c-wiz[1]/span/span/div/textarea")
        actions=ActionChains(driver)
        actions.click(sourceHeader)
        actions.key_down(Keys.CONTROL).send_keys("a").key_up(Keys.CONTROL).send_keys(Keys.DELETE)
        actions.perform()
         #Get Target Trasnlete
        a+=1
        driver.find_element(By.XPATH,"/html/body/c-wiz/div/div[2]/c-wiz/div[2]/c-wiz/div[1]/div[2]/div[2]/c-wiz[1]/span/span/div/textarea").send_keys(input_data[a])
        time.sleep(4)
        descriptionEn= driver.find_element(By.XPATH,"//span[@class='ryNqvb']").text
        descriptionEn = turkish_to_english(descriptionEn)
        #Clear Source Area
        sourceHeader = driver.find_element(By.XPATH,"/html/body/c-wiz/div/div[2]/c-wiz/div[2]/c-wiz/div[1]/div[2]/div[2]/c-wiz[1]/span/span/div/textarea")
        actions=ActionChains(driver)
        actions.click(sourceHeader)
        actions.key_down(Keys.CONTROL).send_keys("a").key_up(Keys.CONTROL).send_keys(Keys.DELETE)
        actions.perform()
        #Write Values
        f.write(headerEn+"\n\n\n")
        f.write(descriptionEn+"\n\n\n")
        a+=1

    #Clear code this area because Secret Bussiness Info
    #Clear code this area because Secret Bussiness Info
      
  
def turkish_to_english(text):
    # Türkçe harfleri İngilizce karşılıklarıyla değiştirecek sözlük
    turkish_to_english_dict = {
        'ğ': 'g',
        'ü': 'u',
        'ş': 's',
        'ı': 'i',
        'ö': 'o',
        'ç': 'c',
        'Ğ': 'G',
        'Ü': 'U',
        'Ş': 'S',
        'İ': 'I',
        'Ö': 'O',
        'Ç': 'C'
    }
    converted_text = []
    for char in text:
        if char in turkish_to_english_dict:
            converted_text.append(turkish_to_english_dict[char])
        else:
            converted_text.append(char)
    
    return ''.join(converted_text)
    

runProcess()
   
        
       


