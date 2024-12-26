**TaskManager**

TaskManager est une application élégante et moderne de gestion de tâches construite avec Flask pour le backend et Vanilla JavaScript pour le frontend. Ajoutez, complétez et supprimez des tâches facilement, tout en profitant d'une interface utilisateur fluide et agréable.

## Fonctionnalités

- **Ajouter des tâches** : Créez de nouvelles tâches avec des descriptions facultatives.
- **Marquer comme complétée** : Indiquez les tâches comme terminées.
- **Supprimer des tâches** : Retirez les tâches de votre liste une fois qu'elles sont terminées.
- **Interface utilisateur moderne** : Profitez d'une interface élégante et réactive.

## Pré-requis

- **Python 3.x**
- **Flask**
- **SQLite3**

## Installation

1. Clonez le dépôt GitHub :
    ```bash
    git clone https://github.com/WhizuGuru/task-list-app.git
    cd task-list-app
    ```

2. Créez un environnement virtuel et activez-le :
    ```bash
    python -m venv venv
    source venv/bin/activate  # Sur Windows, utilisez `venv\Scripts\activate`
    ```

3. Installez les dépendances :
    ```bash
    pip install Flask
    ```

4. Initialisez la base de données :
    ```bash
    python -c "from app import init_db; init_db()"
    ```

## Utilisation

Pour lancer l'application, exécutez la commande suivante :
```bash
python app.py
```

Ensuite, ouvrez votre navigateur et accédez à `http://localhost:5000` pour utiliser l'application.

## Structure du Projet

```
task-list-app/
│
├── app.py               # Code backend principal
├── templates/
│   └── index.html       # Template HTML principal
├── static/
│   ├── styles.css       # Fichier de styles CSS
│   └── script.js        # Fichier JavaScript
├── database/
│   └── tasks.db         # Base de données SQLite3
└── README.md            # Fichier de documentation
```

## Auteur

Créé par [WhizuGuru](https://github.com/WhizuGuru)

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.
```
