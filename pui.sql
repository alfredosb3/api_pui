-- db: pui


CREATE TABLE `busquedas` (
  `id` VARCHAR(75) NOT NULL,
  `curp` VARCHAR(18) NOT NULL,
  `nombre` VARCHAR(50) DEFAULT NULL,
  `primer_apellido` VARCHAR(50) DEFAULT NULL,
  `segundo_apellido` VARCHAR(50) DEFAULT NULL,
  `fecha_nacimiento` DATE DEFAULT NULL,
  `fecha_desaparicion` DATE DEFAULT NULL,
  `lugar_nacimiento` VARCHAR(20) NOT NULL COMMENT 'Mapeado a estados o valores como DESCONOCIDO o FORÁNEO',
  `sexo_asignado` CHAR(1) DEFAULT NULL COMMENT 'Valores: H, M, X',
  `telefono` VARCHAR(15) DEFAULT NULL,
  `correo` VARCHAR(50) DEFAULT NULL,
  `direccion` VARCHAR(500) DEFAULT NULL,
  `calle` VARCHAR(50) DEFAULT NULL,
  `numero` VARCHAR(20) DEFAULT NULL,
  `colonia` VARCHAR(50) DEFAULT NULL,
  `codigo_postal` VARCHAR(5) DEFAULT NULL,
  `municipio_o_alcaldia` VARCHAR(100) DEFAULT NULL,
  `entidad_federativa` VARCHAR(40) DEFAULT NULL,
  
  /* Campos administrativos adicionales recomendados */
  `estado_busqueda` ENUM('ACTIVA', 'INACTIVA') DEFAULT 'ACTIVA' COMMENT 'Para administrar la baja por el endpoint desactivar-reporte',
  `fecha_registro` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY `id`),
  INDEX `idx_curp` (`curp`),
  INDEX `idx_estado` (`estado_busqueda`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Registro de reportes enviados por la Plataforma Única de Identidad';


