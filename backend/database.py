from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Railway MySQL Connection
DATABASE_URL = "mysql+pymysql://root:CLcvtOfXqTPXPrQjegAYdXRVddOuTrCE@hayabusa.proxy.rlwy.net:13152/railway"

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