import boto3

class cloud:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._initialize()
        return cls._instance

    def _initialize(self):
        self.service_name = 's3'
        self.endpoint_url = 'https://kr.object.ncloudstorage.com'
        self.region_name = 'kr-standard'
        self.access_key = 'q4KrNH8shQCi463UNjqU'
        self.secret_key = 'CasiSrfOHDV6iypdhOoYFqtvCiZtstqeAsZ0PzZl'
        self.client = boto3.client(
            self.service_name,
            endpoint_url=self.endpoint_url,
            region_name=self.region_name,
            aws_access_key_id=self.access_key,
            aws_secret_access_key=self.secret_key,
        )