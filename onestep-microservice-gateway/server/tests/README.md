#Kind Of Test
##Unit Tests
adalah metode verifikasi perangkat lunak di mana programmer menguji suatu unit program layak untuk tidaknya dipakai. Unit testing ini fokusnya pada verifikasi pada unit yang terkecil pada desain perangkat lunak (komponen atau modul perangkat lunak).

##Integration Tests
adalah suatu tahapan proses pengujian aplikasi setelah fase unit testing dan sebelum system testing.
Pada tahapan integration testing, input berupa modul- modul yang telah diuji pada tahapan unit testing, diproses kedalam sub integration testing (interaction testing, UI testing, dll), dan kemudian output yang dihasilkan akan diproses lebih lanjut dalam system testing
Tester memeriksa bagaimana unit-unit tersebut bekerja sebagai suatu kombinasi, bukan lagi sebagai suatu unit yang individual. Misalnya sebuah proses yang dikerjakan oleh dua function, di mana satu function menggunakan hasil output dari function yang lainnya.

##End-to-End Tests
End-to-end testing adalah testing yang menyamakan user behaviour dengan aplikasi dengan environment yang sama seperti production. Memastikan berbagai macam user flow berjalan dengan semestinya. Seperti misalnya menguji hal yang sederhana seperti loading screen, menyimpan data ataupun hal yang lebih kompleks lainnya seperti dari login berlanjut sampai selesai transaksi.


#Testing Setup
##Test Runner
A test runner is the library or tool that picks up an assembly (or a source code directory) that contains unit tests, and a bunch of settings, and then executes them and writes the test results to the console or log files.
example: `mocha or jest`

##Assertion Library
Assertion libraries are tools to verify that things are correct. This makes it a lot easier to test your code, so you don't have to do thousands of if statements.
example: `chai or jest`

##Headless Browser
A headless browser is a web browser without a graphical user interface.
Headless browsers provide automated control of a web page in an environment similar to popular web browsers, but are executed via a command-line interface or using network communication. They are particularly useful for testing web pages as they are able to render and understand HTML the same way a browser would, including styling elements such as page layout, colour, font selection and execution of JavaScript and AJAX which are usually not available when using other testing methods.
example: `pupetter or nighwatch.js or cypress.io`

#Test coverage
Simply put, coverage is “What are we testing and How much are we testing?” 
Test coverage helps monitor the quality of testing, and assists testers to create tests that cover areas that are missing or not validated.
example: `intanbul`

#TDD
#BDD