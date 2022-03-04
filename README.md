# assignment-rest-jwt

Installation:
1. buat file .env sesuai dengan contoh .env.example
2. npm i
3. sesuaikan file config/config.json dengan database anda, dan pastikan db berjalan
4. npx sequelize db:create
5. npx sequelize db:migrate
6. npx sequelize db:seed:all


Public Route:
- POST /sign-in          =======> untuk login
- POST /register         =======> untuk register (tetapi tidak bisa register sebagai role admin, hanya role user biasa)

Route for user:
(hanya role admin yang bisa akses, credential admin ada di file seeders user)
- GET /users
- GET /users/:id
- POST /users            =======> untuk membuat user baru (bisa juga menambah admin yang lain)

Route TODO:
- GET /todos      (hanya menampilkan todos yang dibuat sendiri)
- GET /todos/:id   (hanya menampilkan todos yang dibuat sendiri)
- POST /todos
- PUT /todos/:id  (hanya user pemilik todo yang bisa edit)      ======> edit title, and description
- PATCH /todos/:id  (hanya user pemilik todo yang bisa edit)    ======> edit status
