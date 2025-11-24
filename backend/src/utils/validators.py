def validate_property_data(property_data):
    if not isinstance(property_data, dict):
        raise ValueError("Property data must be a dictionary.")
    
    required_fields = ['address', 'landlord_name', 'price', 'district', 'complaints', 'risk_level']
    for field in required_fields:
        if field not in property_data:
            raise ValueError(f"Missing required field: {field}")

    if not isinstance(property_data['price'], (int, float)) or property_data['price'] < 0:
        raise ValueError("Price must be a non-negative number.")

    if property_data['risk_level'] not in ['low', 'medium', 'high']:
        raise ValueError("Risk level must be one of: low, medium, high.")

def validate_landlord_data(landlord_data):
    if not isinstance(landlord_data, dict):
        raise ValueError("Landlord data must be a dictionary.")
    
    required_fields = ['name', 'contact_info', 'verified']
    for field in required_fields:
        if field not in landlord_data:
            raise ValueError(f"Missing required field: {field}")

    if not isinstance(landlord_data['verified'], bool):
        raise ValueError("Verified field must be a boolean value.")