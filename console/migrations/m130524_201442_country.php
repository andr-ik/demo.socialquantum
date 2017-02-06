<?php

namespace console\migrations;

use yii\db\Schema;

class m130524_201442_country extends Migration
{
    public $table = '{{%country}}';

    public function up()
    {
        $this->createTable($this->table, [
            'id' => $this->primaryKey(),
            'title' => $this->string()->notNull()->unique(),
            'vk_id' => $this->integer()->notNull()->unique(),
            'created_at' => Schema::TYPE_TIMESTAMP." NOT NULL DEFAULT CURRENT_TIMESTAMP",
            'updated_at' => Schema::TYPE_TIMESTAMP." NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
            'is_active' => $this->boolean()->defaultValue(0),
        ], $this->tableOptions);
    }

    public function down()
    {
        $this->dropTable($this->table);
    }
}
