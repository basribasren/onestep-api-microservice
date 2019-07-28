#Create Model and Seed Metadata
npx sequelize-cli model:generate --name QuranMetadata --attributes numberOfSurah:integer,countOfAyat:integer,name:string,tname:string,ename:string,type:string,countOfOrder:integer,countOfRuku:integer

npx sequelize-cli seed:generate --name init-metadata

#Create Model and Seed Text
npx sequelize-cli model:generate --name QuranText --attributes numberOfSurah:integer,numberOfAyat:integer,text:text

npx sequelize-cli seed:generate --name init-text

#Create Model and Seed TranslationEN
npx sequelize-cli model:generate --name TranslationEN --attributes numberOfSurah:integer,numberOfAyat:integer,text:text

npx sequelize-cli seed:generate --name init-translation-en

#Create Model and Seed TranslationID
npx sequelize-cli model:generate --name TranslationID --attributes numberOfSurah:integer,numberOfAyat:integer,text:text

npx sequelize-cli seed:generate --name init-translation-id

#Do Seed all
npx sequelize-cli db:seed:all