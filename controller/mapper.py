def controller_to_backend(**kwargs):
    characters = {
        "albin": {
            "name": "Albin",
            "money": kwargs["albin_value_money"],
            "needs": {
                "hunger": kwargs["albin_value_hunger"],
                "comfort": kwargs["albin_value_comfort"],
                "bladder": kwargs["albin_value_bladder"],
                "energy": kwargs["albin_value_energy"],
                "fun": kwargs["albin_value_fun"],
                "social": kwargs["albin_value_social"],
                "hygiene": kwargs["albin_value_hygiene"],
                "environment": kwargs["albin_value_environment"]
            }
        },
        "oscar": {
            "name": "Oscar",
            "money": kwargs["oscar_value_money"],
            "needs": {
                "hunger": kwargs["oscar_value_hunger"],
                "comfort": kwargs["oscar_value_comfort"],
                "bladder": kwargs["oscar_value_bladder"],
                "energy": kwargs["oscar_value_energy"],
                "fun": kwargs["oscar_value_fun"],
                "social": kwargs["oscar_value_social"],
                "hygiene": kwargs["oscar_value_hygiene"],
                "environment": kwargs["oscar_value_environment"]
            }
        },
        "emilia": {
            "name": "Emilia",
            "money": kwargs["emilia_value_money"],
            "needs": {
                "hunger": kwargs["emilia_value_hunger"],
                "comfort": kwargs["emilia_value_comfort"],
                "bladder": kwargs["emilia_value_bladder"],
                "energy": kwargs["emilia_value_energy"],
                "fun": kwargs["emilia_value_fun"],
                "social": kwargs["emilia_value_social"],
                "hygiene": kwargs["emilia_value_hygiene"],
                "environment": kwargs["emilia_value_environment"]
            }
        },
        "george": {
            "name": "George",
            "money": kwargs["george_value_money"],
            "needs": {
                "hunger": kwargs["george_value_hunger"],
                "comfort": kwargs["george_value_comfort"],
                "bladder": kwargs["george_value_bladder"],
                "energy": kwargs["george_value_energy"],
                "fun": kwargs["george_value_fun"],
                "social": kwargs["george_value_social"],
                "hygiene": kwargs["george_value_hygiene"],
                "environment": kwargs["george_value_environment"]
            }
        },
        "agnes": {
            "name": "Agnes",
            "money": kwargs["agnes_value_money"],
            "needs": {
                "hunger": kwargs["agnes_value_hunger"],
                "comfort": kwargs["agnes_value_comfort"],
                "bladder": kwargs["agnes_value_bladder"],
                "energy": kwargs["agnes_value_energy"],
                "fun": kwargs["agnes_value_fun"],
                "social": kwargs["agnes_value_social"],
                "hygiene": kwargs["agnes_value_hygiene"],
                "environment": kwargs["agnes_value_environment"]
            }
        },
        "isabel": {
            "name": "Isabel",
            "money": kwargs["isabel_value_money"],
            "needs": {
                "hunger": kwargs["isabel_value_hunger"],
                "comfort": kwargs["isabel_value_comfort"],
                "bladder": kwargs["isabel_value_bladder"],
                "energy": kwargs["isabel_value_energy"],
                "fun": kwargs["isabel_value_fun"],
                "social": kwargs["isabel_value_social"],
                "hygiene": kwargs["isabel_value_hygiene"],
                "environment": kwargs["isabel_value_environment"]
            }
        }
    }

    json = {
        "selected_character": kwargs["selected_character"],
        "characters": characters
    }

    return json

def backend_to_controller(**kwargs):
    names = ["albin", "george", "emilia", "oscar", "agnes", "isabel"]
    characters = kwargs["characters"]
    controller_dict = {
        'selected_character': kwargs["selected_character"]
    }

    for name in names:
        controller_dict[f"{name}_value_money"] = characters[name]["money"]
        controller_dict[f"{name}_value_hunger"] = characters[name]["needs"]["hunger"]
        controller_dict[f"{name}_value_comfort"] = characters[name]["needs"]["comfort"]
        controller_dict[f"{name}_value_bladder"] = characters[name]["needs"]["bladder"]
        controller_dict[f"{name}_value_energy"] = characters[name]["needs"]["energy"]
        controller_dict[f"{name}_value_fun"] = characters[name]["needs"]["fun"]
        controller_dict[f"{name}_value_social"] = characters[name]["needs"]["social"]
        controller_dict[f"{name}_value_hygiene"] = characters[name]["needs"]["hygiene"]
        controller_dict[f"{name}_value_environment"] = characters[name]["needs"]["environment"]

    return controller_dict