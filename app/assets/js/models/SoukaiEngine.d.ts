type PrimaryKey = string;

type Data = { [key: string]: Data };

type Attributes = Data & { id: PrimaryKey };

interface SoukaiEngine {

    create(collection: string, attributes: Data): Promise<PrimaryKey>;

    read(collection: string, id?: PrimaryKey): Promise<Attributes>;

    update(collection: string, id: PrimaryKey, attributes: Data): Promise<void>;

    delete(collection: string, id: PrimaryKey): Promise<void>;

}