	CREATE TABLE users(
		us_id SERIAL NOT NULL PRIMARY KEY,
		us_email VARCHAR(100) NOT NULL UNIQUE,
		us_name VARCHAR(60) NOT NULL,
		us_lastname VARCHAR(60) NOT NULL,
		us_password VARCHAR(255) NOT NULL,
		handle VARCHAR(1) NULL
	);

	CREATE TABLE schedules(
		sch_id SERIAL NOT NULL PRIMARY KEY,
		sch_schedule VARCHAR(200) NOT NULL UNIQUE,
		handle VARCHAR(1) NULL
	);

	CREATE TABLE evaluators(
		ev_id SERIAL NOT NULL PRIMARY KEY,
		ev_name VARCHAR(60) NOT NULL,
		ev_email VARCHAR(100) NOT NULL UNIQUE,
		ev_phone VARCHAR(20) NOT NULL,
		ev_academic_level VARCHAR(150) NOT NULL,
		ev_status INT NOT NULL,
		sch_id INT NOT NULL REFERENCES schedules(sch_id),
		handle VARCHAR(1) NULL
	);


	CREATE TABLE binnacles(
		bin_id SERIAL NOT NULL PRIMARY KEY,
		bin_return_code INT NOT NULL,
		bin_message VARCHAR(255) NOT NULL,
		bin_datetime TIMESTAMP NOT NULL,
		us_id INT NOT NULL REFERENCES users(us_id),
		handle VARCHAR(1) NULL
	);

	CREATE TABLE levels(
		lv_id SERIAL NOT NULL PRIMARY KEY,
		lv_name VARCHAR(60) NOT NULL UNIQUE,
		handle VARCHAR(1) NULL
	);

	CREATE TABLE locals(
		lc_id SERIAL NOT NULL PRIMARY KEY,
		lc_name VARCHAR(60) NOT NULL UNIQUE,
		handle VARCHAR(1) NULL
	);

	CREATE TABLE courses(
		cou_id SERIAL NOT NULL PRIMARY KEY,
		cou_name VARCHAR(60) NOT NULL,
		cou_teacher_guide VARCHAR(120) NOT NULL,
		lv_id INT NOT NULL REFERENCES levels(lv_id),
		lc_id INT NOT NULL REFERENCES locals(lc_id),
		handle VARCHAR(1) NULL
	);

	CREATE TABLE assignments(
		asg_id SERIAL NOT NULL PRIMARY KEY,
		cou_id INT NOT NULL REFERENCES courses(cou_id),
		ev_id INT NOT NULL REFERENCES evaluators(ev_id),
		handle VARCHAR(1) NULL
	);
