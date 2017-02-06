<?php

namespace console\migrations;

use yii\db\Schema;

class m130524_201444_people extends Migration
{
    public $table = '{{%people}}';

    public function up()
    {
        $this->createTable($this->table, [
            'id' => $this->primaryKey(),
            'name' => $this->string(255)->notNull(),
            'phone' => $this->string(14)->notNull(),
            'country_id' => $this->integer(),
            'created_at' => Schema::TYPE_TIMESTAMP." NOT NULL DEFAULT CURRENT_TIMESTAMP",
            'updated_at' => Schema::TYPE_TIMESTAMP." NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
            'is_active' => $this->boolean()->defaultValue(0),
        ], $this->tableOptions);

        $this->addForeignKey('fk_people_country_id', $this->table, 'country_id', '{{%country}}', 'id', 'SET NULL', 'SET NULL');
    }

    public function down()
    {
        $this->dropForeignKey('fk_people_country_id', $this->table);
        $this->dropTable($this->table);
    }
}
