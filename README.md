# Alos_act2

Cette API a été créée à l'aide d' Express Web Application Framework que vous pouvez voir dans le fichier package.json.

Structure du fichier :
un fichier package.json, qui va reprendre différentes informations du projet et qui contiendra les dépendances qu'on va y installer.
un fichier db.json, qui va reprendre la base de données des individuals avec le id ,nom ,prénom , age ,gender ,addresse, email ,téléphone,specialité,  
un fichier index.js qui va reprendre l’implémentation de l’ensemble des routes en utilisant le package express et des middlwares validation des données dans l’ajout.
un fichier test.js pour tester notre API avec mocha.

Définition des ressources de notre Node JS API:
Pour notre api, Nous aurons besoin des fonctionnalités suivantes:
Créer un individual
Lister l'ensemble des individuals
Récupérer les détails d'un individual en particulier
mise à jour la liste des individuals
Supprimer un individual
