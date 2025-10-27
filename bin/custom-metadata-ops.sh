####     NOT WORKING
# sfdx cmdt generate records --csv product-catalogue-config.csv --type-name Product_Catalogue_Config__mdt
# sf cmdt generate records --csv product-catalogue-config.csv --type-name Product_Catalogue_Config__mdt


# sfdx force:source:retrieve -m CustomObject:ProductCatalogue_Config__mdt
# sf retrieve metadata --type CustomMetadata:ProductCatalogue_Config__mdt

# force-app/main/default/customMetadata
# sfdx force:source:deploy -m CustomMetadata:ProductCatalogue_Config__mdt
# sf deploy metadata --type CustomMetadata:ProductCatalogue_Config__mdt

# deploy a specific record
# sf deploy metadata --type CustomMetadata:ProductCatalogue_Config__mdt.Record_A

###################### WORKING
# retrieve the custom metadata type definition
sf project retrieve start -m CustomObject:My_Custom_Metadata_Type__mdt

# retrieve a specific custom metadata record
sf project retrieve start -m CustomMetadata:MetadataTypeAPIName.MetadataRecordAPIName

sf project retrieve start -m `CustomMetadata:Product_Catalogue_Config__mdt.*`

sf project retrieve start -m CustomMetadata:Product_Catalogue_Config__mdt.root_deposit
sf project retrieve start -m CustomMetadata:Product_Catalogue_Config__mdt.root_lending
sf project retrieve start -m CustomMetadata:Product_Catalogue_Config__mdt.root_card
sf project retrieve start -m CustomMetadata:Product_Catalogue_Config__mdt.root_digitalService

# batch retrieve
sf project retrieve start -m CustomMetadata:Product_Catalogue_Config__mdt.root_deposit -m CustomMetadata:Product_Catalogue_Config__mdt.root_lending -m CustomMetadata:Product_Catalogue_Config__mdt.root_card -m CustomMetadata:Product_Catalogue_Config__mdt.root_digitalService 
# deploy all custom metadata in a folder
sf project deploy start --source-dir pkg-in-branch-admin-prod-cat/main/default/customMetadata 


    <?xml version="1.0" encoding="UTF-8"?>
    <Package xmlns="http://soap.sforce.com/2006/04/metadata">
        <types>
            <members>My_Custom_Metadata_Type__mdt</members>
            <name>CustomObject</name>
        </types>
        <types>
            <members>My_Custom_Metadata_Type.MyRecord1</members>
            <members>My_Custom_Metadata_Type.MyRecord2</members>
            <name>CustomMetadata</name>
        </types>
        <version>58.0</version> <!-- Adjust version as needed -->
    </Package>
sf project retrieve start -x path/to/package.xml