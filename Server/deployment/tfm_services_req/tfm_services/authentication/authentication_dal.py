from tfm_services.databases.mysql.transaction import Transaction, ETransactionStatus
from tfm_services.authentication.databases.mysql.user import User
from tfm_services.authentication.authentication_data import UserInfo

class AuthenticationDAL:

    def add_user(self, user_info):

        user = User(user_name = user_info.user_name,
                    password = user_info.password)
                    
        transaction = Transaction.buildTransaction(lambda db_session: db_session.add(user))
        transaction.execute()

        return transaction.status == ETransactionStatus.Successful

    def remove_user(self, user_name):
        
        transaction = Transaction.buildTransaction(AuthCallback.remove_user, user_name)
        transaction.execute()

        return transaction.status == ETransactionStatus.Successful

    def get_user(self, user_name):

        transaction = Transaction.buildTransaction(AuthCallback.get_user, user_name)
        transaction.execute()

        if transaction.status == ETransactionStatus.Successful:
            return transaction.result

    def exists_user(self, user_name):
        
        transaction = Transaction.buildTransaction(AuthCallback.exists_user, user_name)
        transaction.execute()

        return transaction.status == ETransactionStatus.Successful and transaction.result

class AuthCallback:

    # -------------------------------------------------------
    # NOTE: remove_user, get_user assumes user already exists
    # -------------------------------------------------------

    @staticmethod
    def remove_user(db_session, user_name):

        user = db_session.query(User) \
                         .filter_by(user_name = user_name) \
                         .one()
                        
        db_session.delete(user)

    @staticmethod
    def get_user(db_session, user_name):

        user = db_session.query(User) \
                         .filter_by(user_name = user_name) \
                         .one()
        
        return UserInfo(user_name = user.user_name,
                        password = user.password,
                        is_admin = user.is_admin)

    @staticmethod
    def exists_user(db_session, user_name):

        return db_session.query(User) \
                         .filter_by(user_name = user_name) \
                         .scalar() is not None