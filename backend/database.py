from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# MySQL connection URL
DATABASE_URL = "mysql+pymysql://root:1427@localhost/delay_analysis"

# Engine
engine = create_engine(
    DATABASE_URL,
    echo=False
)

# Session
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()