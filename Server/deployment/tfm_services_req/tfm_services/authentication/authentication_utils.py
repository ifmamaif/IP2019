import hashlib
import jwt

class AuthenticationUtils:

    @staticmethod
    def encrypt_string(hash_string):
        sha_hash = hashlib.sha256(hash_string.encode()).hexdigest()
        return sha_hash
    
    @staticmethod
    def check_encrypted_string(base_string, hash_string):
        return AuthenticationUtils.encrypt_string(base_string) == hash_string

    @staticmethod
    def encode_jwt(payload, secret_key):
        encoded_jwt = jwt.encode(payload, secret_key)
        return encoded_jwt.decode()
    
    @staticmethod
    def decode_jwt(encoded_jwt, secret_key):
        decoded_jwt = None
        
        try:
            decoded_jwt = jwt.decode(encoded_jwt, secret_key)
        except: 
            decode_jwt = None
        
        return decoded_jwt