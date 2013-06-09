import org.codehaus.jackson.map.Module;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.neo4j.cypher.ExecutionEngine;
import org.neo4j.cypher.ExecutionResult;
import org.neo4j.geoff.Geoff;
import org.neo4j.geoff.Subgraph;
import org.neo4j.geoff.except.SubgraphError;
import org.neo4j.geoff.except.SyntaxError;
import org.neo4j.graphdb.*;
import org.neo4j.graphdb.factory.GraphDatabaseFactory;
import org.neo4j.kernel.impl.util.FileUtils;
import org.neo4j.kernel.impl.util.StringLogger;

import java.io.*;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: alfie
 * Date: 07/06/13
 * Time: 23:46
 * To change this template use File | Settings | File Templates.
 */
public class Neo4jTest {
    private static final String DB_PATH = "target/neo4j-hello-db";

    private static enum RelTypes implements RelationshipType
    {
        KNOWS
    }

    @Before
    public void setup() {
        clearDb();
    }

    @Test
    public void test() throws SyntaxError, SubgraphError, IOException {
        GraphDatabaseService db = new GraphDatabaseFactory().newEmbeddedDatabase(DB_PATH);
        registerShutdownHook( db );

        Transaction tx = db.beginTx();
        try
        {
            InputStream inputStream = Neo4jTest.class.getResourceAsStream("data.geoff");
            assert(inputStream != null);

            Subgraph subgraph = new Subgraph(new InputStreamReader(inputStream));
            Geoff.insertIntoNeo4j(subgraph, db, null);

            tx.success();
        }
        finally
        {
            tx.finish();
        }

        ExecutionEngine engine = new ExecutionEngine( db, StringLogger.SYSTEM );
        ExecutionResult result = engine.execute( "start n=node(*) match (n)-[r]->(m) return n,r,m" );
        result.dumpToString(new PrintWriter( System.out, true ));
    }

    private void clearDb()
    {
        try
        {
            FileUtils.deleteRecursively(new File(DB_PATH));
        }
        catch ( IOException e )
        {
            throw new RuntimeException( e );
        }
    }

    private static void registerShutdownHook( final GraphDatabaseService graphDb )
    {
        // Registers a shutdown hook for the Neo4j instance so that it
        // shuts down nicely when the VM exits (even if you "Ctrl-C" the
        // running application).
        Runtime.getRuntime().addShutdownHook( new Thread()
        {
            @Override
            public void run()
            {
                graphDb.shutdown();
            }
        } );
    }}
