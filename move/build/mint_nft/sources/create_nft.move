module mint_nft::create_nft {
    use std::bcs;
    use std::error;
    use std::signer;
    use std::string::{Self, String};

    use aptos_token::token;
    use aptos_token::token::TokenDataId;

    struct ModuleData has key {
        token_data_id: TokenDataId,
    }

    const ENOT_AUTHORIZED: u64 = 1;

    
    fun init_module(source_account: &signer) {
        let collection_name = string::utf8(b"Event Tickets");
        let description = string::utf8(b"Collection of Event Tickets");
        let collection_uri = string::utf8(b"https://example.com/collection_uri");
        let token_name = string::utf8(b"Event Ticket");
        let token_uri = string::utf8(b"https://example.com/token_uri");
        let maximum_supply = 0;
        let mutate_setting = vector<bool>[false, false, false];

        token::create_collection(source_account, collection_name, description, collection_uri, maximum_supply, mutate_setting);

        let token_data_id = token::create_tokendata(
            source_account,
            collection_name,
            token_name,
            string::utf8(b""),
            0,
            token_uri,
            signer::address_of(source_account),
            1,
            0,
            token::create_token_mutability_config(&vector<bool>[false, false, false, false, true]),
            vector<String>[string::utf8(b"given_to")],
            vector<vector<u8>>[b""],
            vector<String>[string::utf8(b"address")]
        );

        move_to(source_account, ModuleData {
            token_data_id,
        });
    }

 
    public fun delayed_mint_event_ticket(module_owner: &signer, receiver: &signer) acquires ModuleData {
        assert!(signer::address_of(module_owner) == @mint_nft, error::permission_denied(ENOT_AUTHORIZED));

        let module_data = borrow_global_mut<ModuleData>(@mint_nft);
        let token_id = token::mint_token(module_owner, module_data.token_data_id, 1);
        token::direct_transfer(module_owner, receiver, token_id, 1);

        let (creator_address, collection, name) = token::get_token_data_id_fields(&module_data.token_data_id);
        token::mutate_token_properties(
            module_owner,
            signer::address_of(receiver),
            creator_address,
            collection,
            name,
            0,
            1,
            vector<String>[string::utf8(b"given_to")],
            vector<vector<u8>>[bcs::to_bytes(&signer::address_of(receiver))],
            vector<String>[string::utf8(b"address")]
        );
    }
}
