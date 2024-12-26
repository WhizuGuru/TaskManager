from flask import Flask, render_template, request, jsonify
import sqlite3

app = Flask(__name__)

DATABASE = 'database/tasks.db'

def init_db():
    with sqlite3.connect(DATABASE) as conn:
        conn.execute('''
            CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                content TEXT NOT NULL,
                description TEXT,
                completed BOOLEAN NOT NULL DEFAULT 0
            )
        ''')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/tasks', methods=['GET', 'POST'])
def tasks():
    if request.method == 'POST':
        data = request.json
        content = data.get('content')
        description = data.get('description', '')
        with sqlite3.connect(DATABASE) as conn:
            conn.execute('INSERT INTO tasks (content, description) VALUES (?, ?)', (content, description))
        return jsonify({'message': 'Task added!'}), 201

    elif request.method == 'GET':
        with sqlite3.connect(DATABASE) as conn:
            tasks = conn.execute('SELECT id, content, description, completed FROM tasks').fetchall()
        return jsonify([{'id': t[0], 'content': t[1], 'description': t[2], 'completed': bool(t[3])} for t in tasks])

@app.route('/tasks/<int:task_id>', methods=['PUT', 'DELETE'])
def manage_task(task_id):
    with sqlite3.connect(DATABASE) as conn:
        if request.method == 'PUT':
            completed = request.json.get('completed', False)
            conn.execute('UPDATE tasks SET completed = ? WHERE id = ?', (completed, task_id))
        elif request.method == 'DELETE':
            conn.execute('DELETE FROM tasks WHERE id = ?', (task_id,))
    return jsonify({'message': 'Task updated!' if request.method == 'PUT' else 'Task deleted!'})

if __name__ == '__main__':
    init_db()
    app.run(debug=True)
