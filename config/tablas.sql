CREATE DATABASE uabc;
USE uabc;
CREATE TABLE InformesDeDonaciones (
                                      informe_id INT AUTO_INCREMENT PRIMARY KEY,
                                      user_id INT,
                                      fecha_creacion DATE NOT NULL,
                                      contenido_informe TEXT NOT NULL,
                                      carrera_destino VARCHAR(255) NOT NULL,
                                      estatus ENUM('Generado por Coordinador', 'Recibido por Administrador', 'Reclamado por Administrador', 'Aceptado') NOT NULL,
                                      FOREIGN KEY (user_id) REFERENCES Usuarios(user_id)
);
-- Tabla para Usuarios
CREATE TABLE Usuarios (
                          user_id INT AUTO_INCREMENT PRIMARY KEY,
                          nombre VARCHAR(255) NOT NULL,
                          correo_electronico VARCHAR(255) NOT NULL,
                          contraseña VARCHAR(255) NOT NULL,
                          role_id INT,
                          FOREIGN KEY (role_id) REFERENCES Roles(role_id)
);

-- Tabla para Coordinadores de Carrera
CREATE TABLE CoordinadoresDeCarrera (
                                        coordinador_id INT AUTO_INCREMENT PRIMARY KEY,
                                        user_id INT,
                                        carrera VARCHAR(255) NOT NULL,
                                        FOREIGN KEY (user_id) REFERENCES Usuarios(user_id)
);

-- Tabla para Donadores
CREATE TABLE Donadores (
                           donador_id INT AUTO_INCREMENT PRIMARY KEY,
                           user_id INT,
                           rfc VARCHAR(13) NOT NULL,
                           constancia_fiscal VARCHAR(255) NOT NULL,
                            -- Otros atributos específicos para donadores
                           FOREIGN KEY (user_id) REFERENCES Usuarios(user_id)
);

-- Tabla para Administradores del Sistema
CREATE TABLE AdministradoresSistema (
                                        admin_sistema_id INT AUTO_INCREMENT PRIMARY KEY,
                                        user_id INT,
                                        -- Otros atributos específicos para administradores del sistema
                                        FOREIGN KEY (user_id) REFERENCES Usuarios(user_id)
);

-- Tabla para Administradores de la Unidad Académica
CREATE TABLE AdministradoresUnidadAcademica (
                                                admin_unidad_academica_id INT AUTO_INCREMENT PRIMARY KEY,
                                                user_id INT,
                                                unidad_academica VARCHAR(255) NOT NULL,
    -- Otros atributos específicos para administradores de la unidad académica
                                                FOREIGN KEY (user_id) REFERENCES Usuarios(user_id)
);
CREATE TABLE Donaciones (
                            donacion_id INT AUTO_INCREMENT PRIMARY KEY,
                            user_id INT,
                            monto DECIMAL(10, 2) NOT NULL,
                            fecha_donacion DATE NOT NULL,
                            comprobante VARCHAR(255),
                            FOREIGN KEY (user_id) REFERENCES Usuarios(user_id)
);
CREATE TABLE Roles (
                       role_id INT AUTO_INCREMENT PRIMARY KEY,
                       nombre_del_rol VARCHAR(255) NOT NULL
); --Rol 1=Admin 2=Usuario 3=Coordinador

INSERT INTO Usuarios (nombre, correo_electronico, contrasena, role_id) VALUES
('Juan Pérez', 'juan.perez@email.com', 'contraseña123', 1),
('Ana Gómez', 'ana.gomez@email.com', 'contraseña456', 2),
('Carlos López', 'carlos.lopez@email.com', 'contraseña789', 3);

INSERT INTO Donadores (user_id, rfc, constancia_fiscal) VALUES
(2, 'RFC987654321', 'Constancia2.pdf');

INSERT INTO Donaciones (user_id, monto, fecha_donacion, comprobante) VALUES
(2, 1500.00, '2023-11-14', 'Comprobante1.pdf'),
(2, 2500.00, '2023-11-15', 'Comprobante2.pdf'),
(2, 3500.00, '2023-11-16', 'Comprobante3.pdf');

INSERT INTO InformesDeDonaciones (user_id, fecha_creacion, contenido_informe, carrera_destino, estatus) VALUES
(2, '2023-11-14', 'Informe de la donación de 1500.00', 'Ingeniería', 'Generado por Coordinador'),
(2, '2023-11-15', 'Informe de la donación de 2500.00', 'Medicina', 'Recibido por Administrador'),
(2, '2023-11-16', 'Informe de la donación de 3500.00', 'Derecho', 'Reclamado por Administrador');
